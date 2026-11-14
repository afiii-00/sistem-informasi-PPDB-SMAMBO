import React from 'react';

export function SchoolLogo({ size = 44, style = {} }) {
  return (
    <img
      src="/smambo-logo.png"
      alt="Logo SMA Muhammadiyah Kota Bogor"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        flex: `0 0 ${size}px`,
        objectFit: 'contain',
        display: 'block',
        borderRadius: '10px',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        ...style,
      }}
    />
  );
}
