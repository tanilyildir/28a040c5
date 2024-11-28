const mockCalls = [
    {
      id: 1,
      created_at: '2024-11-25T10:30:00Z',
      direction: 'inbound',
      from: '14155552671',
      to: '14155551234',
      via: '14155551000',
      duration: 300,  // 5 minutes in seconds
      is_archived: false,
      call_type: 'answered',
    },
    {
      id: 2,
      created_at: '2024-11-25T09:15:00Z',
      direction: 'outbound',
      from: '14155551234',
      to: '14155552671',
      via: '14155551000',
      duration: 180,  // 3 minutes in seconds
      is_archived: true,
      call_type: 'missed',
    },
    {
      id: 3,
      created_at: '2024-11-25T08:50:00Z',
      direction: 'inbound',
      from: '14155552345',
      to: '14155551234',
      via: '14155551000',
      duration: 120,  // 2 minutes in seconds
      is_archived: false,
      call_type: 'voicemail',
    },
    {
      id: 4,
      created_at: '2024-11-24T15:00:00Z',
      direction: 'outbound',
      from: '14155551234',
      to: '14155552789',
      via: '14155551000',
      duration: 240,  // 4 minutes in seconds
      is_archived: true,
      call_type: 'answered',
    },
    {
      id: 5,
      created_at: '2024-11-24T14:30:00Z',
      direction: 'inbound',
      from: '14155552987',
      to: '14155551234',
      via: '14155551000',
      duration: 90,  // 1.5 minutes in seconds
      is_archived: false,
      call_type: 'missed',
    },
    {
      id: 6,
      created_at: '2024-11-23T10:00:00Z',
      direction: 'outbound',
      from: '14155551234',
      to: '14155552345',
      via: '14155551000',
      duration: 150,  // 2.5 minutes in seconds
      is_archived: false,
      call_type: 'answered',
    },
    {
      id: 7,
      created_at: '2024-11-23T13:45:00Z',
      direction: 'inbound',
      from: '14155552567',
      to: '14155551234',
      via: '14155551000',
      duration: 60,  // 1 minute in seconds
      is_archived: true,
      call_type: 'voicemail',
    },
    {
      id: 8,
      created_at: '2024-11-23T13:45:00Z',
      direction: 'inbound',
      from: '14155552567',
      to: '14155551234',
      via: '14155551000',
      duration: 60,  // 1 minute in seconds
      is_archived: true,
      call_type: 'voicemail',
    },
    {
      id: 9,
      created_at: '2024-11-23T13:45:00Z',
      direction: 'inbound',
      from: '14155552567',
      to: '14155551234',
      via: '14155551000',
      duration: 60,  // 1 minute in seconds
      is_archived: true,
      call_type: 'voicemail',
    },
    {
      id: 10,
      created_at: '2024-11-23T13:45:00Z',
      direction: 'inbound',
      from: '14155552567',
      to: '14155551234',
      via: '14155551000',
      duration: 60,  // 1 minute in seconds
      is_archived: true,
      call_type: 'voicemail',
    }
  ];
  
  export default mockCalls;