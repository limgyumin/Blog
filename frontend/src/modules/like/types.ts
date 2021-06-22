import { AxiosError } from "axios";
import { IResponse } from "types/response.type";
import IUser from "types/user.type";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type LikeAction = ActionType<typeof actions>;

export type LikeState = {
  loading: boolean;
  error: AxiosError<IResponse> | null;
  data: {
    liked: boolean;
    likeCount: number;
    likedUsers: IUser[];
  };
};
