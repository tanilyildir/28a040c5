import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import "./css/activityFeed.css"
import { BsFillTelephoneOutboundFill, BsFillTelephoneInboundFill } from "react-icons/bs";
import { CiVoicemail } from "react-icons/ci";
import { MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
import axios from 'axios';

const ActivityFeed = () => {
    const [view, setView] = useState("feed");
    const [callHistory, setCallHistory] = useState([]);
    const [archive, setArchive] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        // Fetch the activities when the component mounts
        const fetchActivities = async () => {
          try {
            const response = await axios.get('https://aircall-api.onrender.com/activities');
            if (response.status !== 200) {
                console.log(response)
                throw new Error('Failed to fetch activities');
            }
            let archived = [];
            let notArchived = [];
            response.data.forEach(call => {
                // Filter the calls, if no correct number discard
                if (String(call.from).length != 11 || String(call.to).length != 11) {
                    return;
                }
                call.is_archived ? archived.push(call) : notArchived.push(call)
            });
            setCallHistory(notArchived);
            setArchive(archived);
            setDataSource(notArchived);
          } catch (error) {
            console.log(error.message)
          }
        };
    
        fetchActivities();
      }, []); // Empty dependency array to run the effect once

    useEffect(() => {
        view === "feed" ? setDataSource(callHistory) : setDataSource(archive)
    }, [view, archive, callHistory])

    const archiveCallToggle = async (callId) => {
        try {
            const response = await axios.patch(
                `https://aircall-api.onrender.com/activities/${callId}`,
                { is_archived: view === "feed"}
            );
    
            // Check if the request was successful
            if (response.status === 200) {
                
                const callResponse = await axios.get(
                    `https://aircall-api.onrender.com/activities/${callId}`
                );
                
                if (callResponse.status === 200 && view === "feed") {
                    setCallHistory(prevCalls => {
                        return prevCalls.filter(call => call.id !== callId);
                    }); // Remove from call history
                    setArchive(prevArchive => {
                        const updatedArchive = [...prevArchive, callResponse.data];
                        return updatedArchive;
                    });
                } else if(callResponse.status === 200 && view === "archive") {
                    setArchive(prevArchive => {
                        return prevArchive.filter(call => call.id !== callId);
                    });
                    setCallHistory(prevCalls => {
                        const updatedCallHistory = [...prevCalls, callResponse.data];
                        return updatedCallHistory;
                    }); // Remove from call history
                }
            } else {
                console.error('Failed to archive the call');
            }
        } catch (error) {
            console.error('Error archiving the call:', error.message);
        }
    };

    const formatPhoneNumber = (phoneNumber) => {
        let normalizedNumber = phoneNumber.toString();
        // Check if the number doesn't start with a country code and add it if necessary
        if (normalizedNumber.length < 10) {
            return normalizedNumber
        }

        const countryCode = normalizedNumber.slice(0, 1);
        const areaCode = normalizedNumber.slice(1, 4);
        const firstPart = normalizedNumber.slice(4, 7);
        const secondPart = normalizedNumber.slice(7, 11);
        return `+${countryCode} ${areaCode}-${firstPart}-${secondPart}`;
    };

    const formatDate = (dateString) => {
        // will display in local time
        const date = new Date(dateString);
        
        const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        return date.toLocaleString('en-US', options);
    };

    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60); // Calculate the minutes
        const seconds = durationInSeconds % 60; // Calculate the remaining seconds

        if (minutes >= 1) {
            return `| ${minutes} min`; // If more than 1 minute, show just the minutes
        } else {
            return `| ${seconds} secs`; // If less than 1 minute, show just the seconds
        }
    };

    const toggleView = () => {
        setView(view === "feed" ? "archive" : "feed");
    };

    const clearAllCalls = async() => {
        try {
            const promises = dataSource.map(call => archiveCallToggle(call.id));
            await Promise.all(promises);
            console.log('All calls processed successfully!');
        } catch (error) {
            console.error('Error processing some calls:', error);
        }
    }

    const CallItem = ({ call }) => (
        <div className={`call-item ${call.direction}`}>
            <div className="caller-info">
                <h4>{call.direction === "outbound" ? formatPhoneNumber(call.to) : formatPhoneNumber(call.from)}</h4>
                <p className={`call-item ${call.call_type}`}>
                    {call.call_type.toLowerCase() === "voicemail" ? <CiVoicemail /> : call.direction === "outbound" ? <BsFillTelephoneOutboundFill /> : <BsFillTelephoneInboundFill />}
                    {formatDate(call.created_at)}
                    {call.duration !== 0 && ` ${formatDuration(call.duration)}`}
                </p>
            </div>
            <div className="call-details">
                {view === "feed" ? <MdOutlineArchive className="archive-icon" onClick={() => archiveCallToggle(call.id)}/> : <MdOutlineUnarchive className="archive-icon" onClick={() => archiveCallToggle(call.id)}/>}
            </div>
        </div>
    )

    CallItem.propTypes = {
        call: PropTypes.shape({
          id: PropTypes.string.isRequired,
          from: PropTypes.number.isRequired,
          to: PropTypes.number.isRequired,
          direction: PropTypes.string.isRequired,
          call_type: PropTypes.string.isRequired,
          created_at: PropTypes.string.isRequired,
          duration: PropTypes.number.isRequired,
          is_archived: PropTypes.bool.isRequired,
        }).isRequired,
      };

    return(
        <>
            <div className="top-controls">
                <button className="clear-button" onClick={clearAllCalls}>{view === "feed" ? 'Archive all calls' : 'Unarchive all calls'}</button>
                <div className="view-dropdown-container">
                    <select className="view-dropdown" value={view} onChange={toggleView}>
                        <option value="feed">Calls</option>
                        <option value="archive">Archive</option>
                    </select>
                </div>
            </div>
            <div className="feed">
                {dataSource.map((call, index) => {
                    return <CallItem call={call} key={index}/>
                })}
            </div>
        </>
    )
}

export default ActivityFeed;