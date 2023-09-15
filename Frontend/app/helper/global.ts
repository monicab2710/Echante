import jwt_decode from "jwt-decode";
import { Profile, User } from "@/types/profile"


export const decoded = (payload: string) : Profile => {
    const decoded: User = jwt_decode(payload);
    return {
        name: decoded.name,
        lastName: decoded.lastName,
        userName: decoded.userName,
        email: decoded.sub,
        userId: decoded.userId,
        role: decoded.role
    }
};
