import React from 'react';

import { BlogServiceInterface } from "../../services/types"

const BlogServiceContext = React.createContext<BlogServiceInterface | null>(null);

export default BlogServiceContext;