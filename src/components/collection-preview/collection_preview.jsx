import React from 'react';

import CollectionItem from '../collection-item/collection_item.jsx';

import './collection_preview.scss';

const CollectionPreview = ({title, items}) => (
  <div className='collection-preview'>
    <h1 className='Title'>{title.toUpperCase()}</h1>
    <div className='preview'>
      {
        items
        .filter((item, idx) => idx < 4)
        .map(({id, ...otherItemProps}) => (
          <CollectionItem key={id} {...otherItemProps}/>
        ))
      }

    </div>
  </div>
);

export default CollectionPreview;
