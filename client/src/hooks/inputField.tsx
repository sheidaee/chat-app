import React from 'react';

export default function() {
  const [input, setInput] = React.useState({});

  const handleInputChange = (e: any) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  return [input, handleInputChange];
}
