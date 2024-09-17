import React from 'react';
import { Card } from 'antd';
import './CustomCard.scss';
import ImageViewer from './ImageViewer';

const { Meta } = Card;

interface CustomCardProps {
  title: string;
  description: string;
  image: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, description, image }) => (
  <Card
    hoverable
    className="custom-card"
    cover={<ImageViewer alt={title} src={image} className="card-image" />}
  >
    <Meta title={title} description={description} className="card-meta" />
  </Card>
);

export default CustomCard;
