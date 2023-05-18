import React from 'react'
import {Box, Typography} from '@mui/material'

const PageNotFound = () => {
  return (
    <>
      <Box className="not-found">
        <Typography variant='h3' className='color-danger'>Sorry, We are unable to find this page</Typography>
      </Box>
    </>
  );
}

export default PageNotFound
