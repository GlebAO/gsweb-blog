import React from 'react'
import { PostStatus } from '../../../types/PostModel'
import EditButton from '../../common/edit-button'
import PostStatusIndicator from '../post-status-indicator'
import PostStatusManageButton from '../post-status-manage-button/post-status-manage-button'

interface PostManageToolbarInterface {
    status: PostStatus,
    slug: string
}

const PostManageToolbar:React.FC<PostManageToolbarInterface> = ({status, slug}) => {
    return (
        <div className="post-toolbar card-header">
            <div className="post-toolbar-body d-flex flex-nowrap align-items-center justify-content-between">
              <div className="post-status">
                <PostStatusIndicator status={status} />
              </div>
              <div className="post-actions">
                <ul className="list-inline m-0">
                  <li className="list-inline-item">
                    <PostStatusManageButton postSlug={slug}/>
                  </li>
                  <li className="list-inline-item">
                    <EditButton
                      url={`/post/edit/${slug}`}
                      text="Редактировать"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
    )
}

export default PostManageToolbar
