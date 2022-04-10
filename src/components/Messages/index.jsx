import React from 'react';

export const Messages = ({ msg, BgColor }) => {
  let styles = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '250px',
    height: '50px',
    padding: '3px',
    margin: '5px',
    color: '#fffdfd',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    backgroundColor: BgColor,
  };

  let img = {
    width: '20px',
    height: '20px',
  };

  return (
    <div style={styles}>
      <img style={img} src="./../../assets/check.png" alt="icon" />
      <div>{msg}</div>
    </div>
  );
};
