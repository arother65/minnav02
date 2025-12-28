// imports
import { Grid, SpeedDial, Tooltip } from "@mui/material"

//
export default function Footer() {

	return (
		<Grid container columns={12} spacing={0} sx={{}}>
			<Grid size={1}>
				{/* <Button variant="outlined" onClick={(event) => { */}
				{/* setVisible(false) */}
				{/* }}>Ausblenden */}
				{/* </Button> */}
			</Grid>
			<Grid size={10}>
				<p>&copy; 2025</p>
			</Grid>
			<Grid size={1}>
				<Tooltip title="SpeedDial">
					<SpeedDial
						ariaLabel="SpeedDial in footer-tag"
						// sx={{ position: 'sticky', bottom: 1, left: 1, right: 1 }}
						sx={{ position: 'sticky' }}
					>
					</SpeedDial>
				</Tooltip>

				{/* <Tooltip title="Delete"> */}
				{/* <IconButton> */}
				{/* sx={{ color: green[500] }} */}
				{/* <DeleteIcon color="error" /> */}
				{/* </IconButton> */}
				{/* </Tooltip> */}
			</Grid>
		</Grid>
	)
}  // Footer()