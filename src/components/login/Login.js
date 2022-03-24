import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { SIGNIN } from "../../actions/ActionType";
import { Context } from "../../Context";
import { cookie, signInUser } from "../../apiCall";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const Login = () => {
  const handleClose = () => {
    dispatch({
      type: SIGNIN,
      payload: {
        signInEnabled: false,
      },
    });
  };

  const [user, setUser] = React.useState({
    userName: "",
    password: "",
  });

  const [error, setError] = React.useState('');

  const { state, dispatch } = React.useContext(Context);

  const handleLogin = () => {
    signInUser(user).then(res => {
      console.log(res)
      if (res.data && res.data.status) {
        cookie.set('Authorization', res.data.authToken)
        const responseData = {...res.data};
        delete responseData.status;
        delete responseData.message;
        delete responseData.authToken;
        cookie.set('user', responseData.toString());
        handleClose();
      }
      else {
        setError(res.data.error);
      }
    })
  }

  return (
    <div>
      <Modal
        open={state.signInEnabled}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800, marginTop: "1%" }}>
          <div class="container">
            <div class="row">
              <div class="col-5" style={{ border: "1px solid #FAFAFA" }}>
                <div
                  className="row"
                  style={{ textAlign: "center", color: "#2f4676" }}
                >
                  <h4>LOGIN</h4>
                </div>
                <div className="row">
                  <div className="col">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        User Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="User Name"
                        onChange={(e) =>
                          setUser({ ...user, userName: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Password"
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <img
                    src="https://irctclive.nlpcaptcha.in/index.php/media/getit/0F6C_UzlzNXU3VGVMak5ublFsNzNBZjJCK3l6aEE2YjYyNmdJeGxwa2h1VmhMWER6SXlaMmFRMEFGVXZoaGg0UGw1UXlnemJqWGhEZVpYaW9wMSt1c1puQU8zeVB6SzhaVStVVXU3VkJOcS9ienN6UlovTElxbDAxbjY0QzJBeTlVRDU="
                    alt=""
                  />
                </div>
                <div className="row" style={{ padding: "10px" }}>
                  <button className="book-now-btn" onClick={handleLogin}>SIGN IN</button>
                  <button
                    className="login-btn"
                    style={{ marginTop: "10px" }}
                    onClick={() =>
                      window.location.replace("/profile/user-registration")
                    }
                  >
                    REGISTER
                  </button>
                </div>
              </div>
              <div class="col-7">
                <div className="row">
                  <img
                    src="https://tpc.googlesyndication.com/simgad/2890975975070947315"
                    alt=""
                  />
                </div>
                <div className="row">
                  <h5 style={{color: 'red'}}>{error}</h5>
                  </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
