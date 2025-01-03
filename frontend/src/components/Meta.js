import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'GearRush',
  description: 'We sell the best products for cheap',
  keywords: 'sports,buy sports equipments,ball,bat,net,games',
}

export default Meta
