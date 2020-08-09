import React from "react";

import { AuthServiceInterface } from "../services/types";

const AuthServiceContext = React.createContext<AuthServiceInterface | null>(null);

export default AuthServiceContext ;
