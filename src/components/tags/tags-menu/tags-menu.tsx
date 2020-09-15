import React from 'react'
import TagModel from '../../../types/TagModel'
import PostTagsItem from "../post-tag-item"

import "./tags-menu.scss";

interface TagsListInterface {
    tags: TagModel[]
}

const TagsMenu:React.FC<TagsListInterface> = ({tags}) => {
    return (
        <div className="tags-menu">
            <ul className="tags-menu-list list-unstyled ml-n2 mt-n1">
                {tags.map(tag => <li key={tag.slug} className="tags-menu-list_item"><PostTagsItem tag={tag}/></li>)}
            </ul>
        </div>
    )
}

export default TagsMenu
