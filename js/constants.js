const BUZZ = {
  API: "https://9ma1uetdpb.execute-api.us-east-1.amazonaws.com/prod",
  ORIGIN: "https://cheezbuzz.com",
  CONTAINER: null,
  LOADED: false,
  TITLE_MAX_LENGTH: 32,
  CONTENT_MAX_LENGTH: 999,
  state: {
    stories: [],
    ids: []
  },
  focus: null,
  routines: {}
}
