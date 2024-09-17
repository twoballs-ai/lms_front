import React from 'react';
import { Card } from 'antd';
import './CustomCard.scss';
import ImageViewer from './ImageViewer';

const { Meta } = Card;

const CustomCard = ({ title, description, image }) => (
  <Card
    hoverable
    className="custom-card"
    cover={

      <ImageViewer
      alt={title}
      src={image}
      layout="responsive"
      width={400} // Set appropriate width
      height={250} // Set appropriate height
  />
    }
  >
    <Meta title={title} description={description} className="card-meta" />
  </Card>
);

export default CustomCard;
