import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function getNewNumbers() {
  return [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ];
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  controls: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "0 auto",
  },
  slots: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "0 auto",
  },
  slot: {
    width: "60px",
    height: "120px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    fontSize: "4rem",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: "2px",
    padding: theme.spacing(2, 4, 3),
  },
}));

function SimpleModal({
  numbersPlayed,
  setPlayedNumbers,
  setBalance,
  balance,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [numbers, setNumbers] = useState([7, 7, 7]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePlay = () => {
    if (balance > 0 && balance > 0.5) {
      // Game Stuff
      const newNumbers = getNewNumbers();
      setBalance(function playFee(previousBalance) {
        return previousBalance - 1;
      });

      if (newNumbers[0] === newNumbers[1] && newNumbers[0] === newNumbers[2]) {
        if (newNumbers[0] === 7) {
          setBalance(function luckyWin(previousBalance) {
            return previousBalance + 10;
          });
        } else {
          setBalance(function threeConsecutiveWin(previousBalance) {
            return previousBalance + 5;
          });
        }
      } else if (
        newNumbers[0] === newNumbers[1] ||
        newNumbers[1] === newNumbers[2]
      ) {
        setBalance(function twoConsecutiveWin(previousBalance) {
          return previousBalance + 0.5;
        });
      }

      // Adding to table stuff
      const date = new Date( Date.now() );
      let localeSpecificTime = date.toLocaleTimeString();
      localeSpecificTime.replace(/:\d+ /, ' ');

      setPlayedNumbers(function previousNumber(previousPlayedNumbersInfo) {
        return [
          ...previousPlayedNumbersInfo,
          {
            id: previousPlayedNumbersInfo.length + 1,
            slotOne: newNumbers[0],
            slotTwo: newNumbers[1],
            slotThree: newNumbers[2],
            time: localeSpecificTime,
          },
        ];
      });

      setNumbers(newNumbers);
    }
  };

  const handleDebug = () => {
    const newNumbers = [7, 7, 7];

    setBalance(function playFee(previousBalance) {
      return previousBalance - 1;
    });

    if (newNumbers[0] === newNumbers[1] && newNumbers[0] === newNumbers[2]) {
      if (newNumbers[0] === 7) {
        setBalance(function luckyWin(previousBalance) {
          return previousBalance + 10;
        });
      } else {
        setBalance(function threeConsecutiveWin(previousBalance) {
          return previousBalance + 5;
        });
      }
    } else if (
      newNumbers[0] === newNumbers[1] ||
      newNumbers[1] === newNumbers[2]
    ) {
      setBalance(function twoConsecutiveWin(previousBalance) {
        return previousBalance + 0.5;
      });
    }

    setNumbers(newNumbers);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.slots}>
        <div className={`${classes.slotOne} ${classes.slot}`}>{numbers[0]}</div>
        <div className={`${classes.slotTwo} ${classes.slot}`}>{numbers[1]}</div>
        <div className={`${classes.slotThree} ${classes.slot}`}>
          {numbers[2]}
        </div>
      </div>

      <div className={classes.controls}>
        <Button
          style={{ margin: "20px 0" }}
          color="primary"
          variant="contained"
          onClick={handlePlay}
        >
          Play
        </Button>
        <Button
          style={{ margin: "20px 0" }}
          color="secondary"
          variant="contained"
          onClick={handleDebug}
        >
          Debug
        </Button>
        <Button
          style={{ margin: "20px 0" }}
          color="secondary"
          variant="contained"
          onClick={handleClose}
        >
          Close
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Button
        style={{ margin: "20px 0" }}
        color="primary"
        variant="contained"
        onClick={handleOpen}
      >
        Play
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default SimpleModal;
