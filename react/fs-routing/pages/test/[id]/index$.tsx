import React from 'react';
import { useParams } from 'react-router-dom';

export default function Index() {
  const params = useParams();
  const id = params['id'];

  return <h1>{id}</h1>;
}
