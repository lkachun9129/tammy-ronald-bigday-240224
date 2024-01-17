import { DateTime } from "luxon";
import { LocalDateTime } from "./models";

export class Utility {

    /**
     * Convert a number array representing a date time to Luxon.DateTime with time component
     *
     * @param dateValue a number array representing a date time
     * @returns Luxon.DateTime
     */
    public static toDateTime(dateValue: LocalDateTime): DateTime {
        if (!dateValue) {
            return null;
        }

        switch (dateValue.length) {
            case 1:
                return dateValue[0] == null ? null : DateTime.local(dateValue[0]);
            case 2:
                return dateValue[0] == null || dateValue[1] == null ? null : DateTime.local(dateValue[0], dateValue[1]);
            case 3:
                return dateValue[0] == null || dateValue[1] == null || dateValue[2] == null ? null : DateTime.local(dateValue[0], dateValue[1], dateValue[2]);
            case 4:
                return dateValue[0] == null || dateValue[1] == null || dateValue[2] == null || dateValue[3] == null ? null : DateTime.local(dateValue[0], dateValue[1], dateValue[2], dateValue[3]);
            case 5:
                return dateValue[0] == null || dateValue[1] == null || dateValue[2] == null || dateValue[3] == null || dateValue[4] == null ? null : DateTime.local(dateValue[0], dateValue[1], dateValue[2], dateValue[3], dateValue[4]);
            case 6:
                return dateValue[0] == null || dateValue[1] == null || dateValue[2] == null || dateValue[3] == null || dateValue[4] == null || dateValue[5] == null ? null : DateTime.local(dateValue[0], dateValue[1], dateValue[2], dateValue[3], dateValue[4], dateValue[5]);
            case 7:
                return dateValue[0] == null || dateValue[1] == null || dateValue[2] == null || dateValue[3] == null || dateValue[4] == null || dateValue[5] == null || dateValue[6] == null ? null : DateTime.local(dateValue[0], dateValue[1], dateValue[2], dateValue[3], dateValue[4], dateValue[5], dateValue[6]);
            default:
                console.warn('DateUtility::toDateTime - Invalid input value.');
                return null;
        }
    }

    /**
     * Convert Luxon.DateTime to a number array representing a date time
     *
     * @static
     * @param {DateTime} dateTime
     * @returns {number[]} a number array representing a date time
     * @memberof DateUtility
     */
    public static toLocalDateTime(dateTime: DateTime): LocalDateTime {
        if (dateTime.isValid) {
            return [dateTime.year, dateTime.month, dateTime.day, dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond];
        } else {
            return [null, null, null, null, null, null, null];
        }
    }
}