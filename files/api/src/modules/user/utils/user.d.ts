export interface User {
    id?: number;
    username?: string;
    firstname?: string;
    lastname?: string;
    password?: string;
    email?: string;
    age?: number;
    gender?: string;
    sexo?: string;
    bio?: string;
    interests?: string[];
    pictures?: string[];
    notifications?: string[];
    active?: boolean;
    valid?: boolean;
    token?: string;
    popularity?: number;
    agegap?: number[];
    proximity?: number;
    lfpopularity?: number[];
    lfinterests?: string[];
    location?: string;
    latitude?: number;
    longitude?: number;
    socket?: string;
    online?: number;
  }