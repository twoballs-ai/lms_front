import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const CustomCard = ({ title, description, image }) => (
  <Card
    hoverable
    style={{
      width: 450,
    }}
    cover={<img alt={title} src={image} />}
  >
    <Meta title={title} description={description} />
  </Card>
);

export default CustomCard