import React from "react";

interface Props {
  alarms: { name: string; scheduledTime: number }[] | undefined;
  removeAlarm: (identifier: string) => void;
}

const CurrentAlarms = (props: Props) => {
  const getTime = (time: number) => {
    const now = new Date(time);
    let hours: string | number = now.getHours();
    let minutes: string | number = now.getMinutes();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      <table className="w-full">
        <tbody className="w-full">
          {props.alarms?.map((alarm) => (
            <tr className="p-4 mb-3 w-full">
              <td
                onClick={() => props.removeAlarm(alarm.name)}
                className="border-solid border-2 border-primary shadow-lg w-full hover:line-through cursor-pointer p-2 text-lg"
              >
                {getTime(alarm.scheduledTime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {props.alarms && props.alarms[0] && (
        <h4 className="text-gray-400 text-xs mt-1">
          You can only have one active alarm
        </h4>
      )}
    </div>
  );
};

export default CurrentAlarms;
