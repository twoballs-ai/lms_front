import React from 'react';
import { Card } from 'antd';
import './CustomCard.scss';

const { Meta } = Card;

const CustomCard = ({ title, description, image }) => (
  <Card
    hoverable
    className="custom-card"
    cover={<img alt={title} src={image} className="card-image" />}
  >
    <Meta title={title} description={description} className="card-meta" />
  </Card>
);

export default CustomCard;