// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React from 'react';
import styled from 'styled-components';
import {format} from 'd3-format';
import {FormattedMessage} from '@kepler.gl/localization';
import {DataContainerInterface} from '@kepler.gl/utils';
import {DatasetType} from '@kepler.gl/types';

const numFormat = format(',');

type MiniDataset = {
  dataContainer: DataContainerInterface;
  type?: string;
};

export type DatasetInfoProps = {
  dataset: MiniDataset;
};

const StyledDataRowCount = styled.div`
  font-size: 11px;
  color: ${props => props.theme.subtextColor};
  padding-left: 19px;
`;

export default function DatasetInfoFactory() {
  const DatasetInfo: React.FC<DatasetInfoProps> = ({dataset}: DatasetInfoProps) => (
    <StyledDataRowCount className="source-data-rows">
      <FormattedMessage
        id={
          dataset.type === DatasetType.VECTOR_TILE
            ? 'datasetInfo.vectorTile'
            : 'datasetInfo.rowCount'
        }
        values={{rowCount: numFormat(dataset.dataContainer.numRows())}}
      />
    </StyledDataRowCount>
  );

  return DatasetInfo;
}
