import { RusEvent } from "./rusEvent";

export interface Script {
  id?: string;
  title: string;
  date: Date;
  onMeeting: string[];
  events:RusEvent[];
  other: string;
}
