import { useContext, FC } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';

import { PlanningModeContext } from '../../context/planningMode';
import { marks } from './PlanningMode.constants';

import styles from './PlanningMode.module.scss';

function valuetext(value: number) {
  return `${value}PM`;
}

const PlanningMode: FC = () => {
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
    <div className={styles.planningModeContainer}>
      <div
        className={`${styles.scrollbarContainer} ${
          isPlanningModeOn && styles.open
        }`}
      >
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
            root: styles.white,
            markLabel: styles.white
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
