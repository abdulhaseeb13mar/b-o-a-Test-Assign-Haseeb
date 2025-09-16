import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../../redux/action/user";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// Validation schema
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),
  phone: yup
    .string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),
});

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return <div className="text-red-500 text-sm mt-1">{error.message}</div>;
};

const CreateUser = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      phone: "",
      email: "",
    },
  });

  //////////////////////////////////////// STATES /////////////////////////////////////

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const onSubmit = (data) => {
    dispatch(createEmployee(data, setOpen));
    reset();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Employee</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Employee Detials</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">First Name </td>
                <td className="pb-4">
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <TextField
                          {...field}
                          size="small"
                          fullWidth
                          error={!!errors.firstName}
                        />
                        <ErrorMessage error={errors.firstName} />
                      </div>
                    )}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <TextField
                          {...field}
                          size="small"
                          fullWidth
                          error={!!errors.lastName}
                        />
                        <ErrorMessage error={errors.lastName} />
                      </div>
                    )}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">User Name </td>
                <td className="pb-4">
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <TextField
                          {...field}
                          size="small"
                          fullWidth
                          error={!!errors.username}
                        />
                        <ErrorMessage error={errors.username} />
                      </div>
                    )}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <TextField
                          {...field}
                          size="small"
                          fullWidth
                          placeholder="Optional"
                          error={!!errors.email}
                        />
                        <ErrorMessage error={errors.email} />
                      </div>
                    )}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Password </td>
                <td className="pb-4">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <TextField
                          {...field}
                          type="password"
                          size="small"
                          fullWidth
                          error={!!errors.password}
                        />
                        <ErrorMessage error={errors.password} />
                      </div>
                    )}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Phone </td>
                <td className="pb-4">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <TextField
                          {...field}
                          type="number"
                          size="small"
                          fullWidth
                          error={!!errors.phone}
                        />
                        <ErrorMessage error={errors.phone} />
                      </div>
                    )}
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
          >
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateUser;
