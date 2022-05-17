import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {windowWidth} from '../utils/Dimentions';

const SKCardMall = () => {
  return (
    <SkeletonPlaceholder style={{marginTop: 20}}>
      <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
        <SkeletonPlaceholder.Item
          width={windowWidth - 40}
          height={50}
          borderRadius={4}
          marginBottom={5}
        />
        <SkeletonPlaceholder.Item
          width={windowWidth - 40}
          height={50}
          borderRadius={4}
          marginBottom={5}
        />
        <SkeletonPlaceholder.Item
          width={windowWidth - 40}
          height={50}
          borderRadius={4}
          marginBottom={5}
        />
        <SkeletonPlaceholder.Item
          width={windowWidth - 40}
          height={50}
          borderRadius={4}
          marginBottom={5}
        />
        <SkeletonPlaceholder.Item
          width={windowWidth - 40}
          height={50}
          borderRadius={4}
          marginBottom={5}
        />
        <SkeletonPlaceholder.Item
          width={windowWidth - 40}
          height={50}
          borderRadius={4}
          marginBottom={5}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default SKCardMall;
