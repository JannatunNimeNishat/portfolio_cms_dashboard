/* eslint-disable react/prop-types */
import { FormProvider} from "react-hook-form";

const MainForm = ({onSubmit,children,methods}) => {
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
};

export default MainForm;