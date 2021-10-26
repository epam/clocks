import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import { PlanningModeContext } from '../../context/planningMode';
import { marks } from './marks';

const useStyles = makeStyles(theme => ({
    planningModeContainer: {
        marginLeft: 'auto',
        marginRight: '1em',
        display: 'flex',
        alignItems: 'center'
    },
    scrollbarContainer: {
        opacity: 0,
        color: 'white',
        width: '500px',
        display: 'flex',
        paddingTop: '40px',
        transition: 'all .3s ease-in-out'
    },
    open: {
        opacity: 1
    },
    white: {
        color: 'white!important'
    }
}));

function valuetext(value: number) {
    return `${value}PM`;
}

const PlanningMode = () => {
    const classes = useStyles();
    const {
        state: { isPlanningModeOn },
        actions: { PlanningModeHandler }
    } = useContext(PlanningModeContext);

    const planningModeHandler = () => {
        if (PlanningModeHandler) {
            PlanningModeHandler();
        }
    };

    return (
        <div className={classes.planningModeContainer}>
            <div className={`${classes.scrollbarContainer} ${isPlanningModeOn && classes.open}`}>
                <Slider
                    defaultValue={10}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    min={0}
                    max={24}
                    valueLabelDisplay="auto"
                    marks={marks}
                    classes={{
                        root: classes.white,
                        markLabel: classes.white
                    }}
                />
            </div>
            <FormControlLabel
                value="start"
                control={
                    <Switch
                        checked={isPlanningModeOn}
                        onChange={planningModeHandler}
                        color="primary"
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                }
                label="Planning mode"
                labelPlacement="start"
            />
        </div>
    );
};

export default PlanningMode;
