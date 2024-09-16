import React from 'react';
import Image from 'next/image'; // Import the Image component
import { Card } from 'antd';
import './CustomCard.scss';

const { Meta } = Card;

const CustomCard = ({ title, description, image }) => (
  <Card
    hoverable
    className="custom-card"
    cover={
      <Image
        alt={title}
        src={image}
        layout="responsive"
        width={400} // Set appropriate width
        height={250} // Set appropriate height
        className="card-image"
      />
    }
  >
    <Meta title={title} description={description} className="card-meta" />
  </Card>
);

export default CustomCard;
