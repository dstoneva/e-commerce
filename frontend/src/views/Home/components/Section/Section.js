import { Box, Button, Grid, Link, Paper } from '@mui/material'
import { ArrowRight } from '@mui/icons-material'
import React from 'react'
import Headline from '../Headline'

const Section = React.memo(
  ({
    title,
    icon,
    data,
    buttonLink,
    renderItem,
    gridSpacing = 4,
    columnSpacing = 4,
    itemBreakpoints = {},
    itemStyle = {},
    paperStyle = {},
    buttonText = 'View all',
  }) => {
    return (
      <>
        <Headline
          icon={icon}
          additionalComponent={
            <Button
              component={Link}
              href={buttonLink}
              sx={{ fontSize: 14, color: (theme) => theme.palette.grey[600] }}
              endIcon={<ArrowRight />}
            >
              {buttonText}
            </Button>
          }
        >
          {title}
        </Headline>
        <Paper sx={{ p: 2, ...paperStyle }}>
          <Grid container spacing={gridSpacing} columnSpacing={columnSpacing}>
            {data.map((item, i) => (
              <Grid item {...itemBreakpoints} key={i}>
                <Box sx={{ m: 'auto', ...itemStyle }}>{renderItem(item)}</Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </>
    )
  }
)

export default Section
