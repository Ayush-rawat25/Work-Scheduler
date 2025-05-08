const { google } = require("googleapis");

const getCalendarEvents = async (accessToken) => {
  const oAuth2Client = new google.auth.OAuth2();

  oAuth2Client.setCredentials({ access_token: accessToken });
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  try {
    const res = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    return res.data.items;
  } catch (error) {
    console.error("Error fetching calendar events:", error.response?.data || error.message);
    throw error;
  }
};

const addEventToGoogleCalendar = async(accessToken, task) =>{
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  const calendar = google.calendar({version:"v3", auth:oauth2Client})

  const event = {
    summary: task.summary,
    description: task.description || "",
    start: {
      dateTime: task.start,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: task.end,
      timeZone: "Asia/Kolkata",
    },
  }
  try{
    const res = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    return res.data;
  }catch(err){
    console.error("Error in adding event to google calendar", err);
    throw err;
  }
}

module.exports = { getCalendarEvents , addEventToGoogleCalendar};
