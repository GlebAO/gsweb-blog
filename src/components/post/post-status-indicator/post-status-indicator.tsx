import React from 'react'
import { PostStatus } from '../../../types/PostModel'

const PostStatusIndicator:React.FC<{status:PostStatus}> = ({status}) => {
    return (
        <div>
             {status === PostStatus.DRAFT && <span className="text-danger">Черновик (виден только Вам)</span>}
             {status === PostStatus.PENDING && <span className="text-warning">На модерации (скоро будет виден всему Интернету)</span>}
        </div>
    )
}

export default PostStatusIndicator
