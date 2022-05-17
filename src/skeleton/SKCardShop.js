import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {windowWidth} from '../utils/Dimentions';
const SKCardShop = () => {
  return (
    <>
      <SkeletonPlaceholder style={{marginTop: 100}}>
        <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
          <SkeletonPlaceholder.Item
            width={windowWidth - 20}
            height={130}
            borderRadius={10}
            margin={10}
          />
          <SkeletonPlaceholder.Item
            width={windowWidth - 20}
            height={130}
            borderRadius={10}
            margin={10}
          />
          <SkeletonPlaceholder.Item
            width={windowWidth - 20}
            height={130}
            borderRadius={10}
            margin={10}
          />
          <SkeletonPlaceholder.Item
            width={windowWidth - 20}
            height={130}
            borderRadius={10}
            margin={10}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </>
  );
};

export default SKCardShop;
