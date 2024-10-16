import React from 'react';
const ScheduleComponent = () => {
    return React.createElement(
      'pretalx-schedule',
      {
        'event-url': "https://talks.osgeo.org/foss4g-sotm-oceania-2023/",
        'locale': "en",
        'format': "grid",
        'class': "pretalx"
      }
    );
  };
  
  export default ScheduleComponent;