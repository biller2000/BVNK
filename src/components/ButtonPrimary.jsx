import React from "react";
import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";

const ButtonPrimary = React.forwardRef(
  (
    { className, children, loading, type = "black", onClick, ...props },
    ref
  ) => {
    return (
      <>
        <button
          className={`text-sm md:text-base flex justify-center rounded-lg ${
            type === "black"
              ? "text-white bg-primaryColor hover:bg-hoverPrimaryColor transition-all"
              : "bg-slate-200 text-primaryColor tooltip"
          } ${loading && "bg-opacity-50 pointer-events-none"} ${className}`}
          ref={ref}
          disabled={loading}
          onClick={onClick}
          {...props}
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : children}
        </button>
      </>
    );
  }
);

ButtonPrimary.displayName = "ButtonPrimary";

ButtonPrimary.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  type: PropTypes.oneOf("fullfil", "outline"),
  onClick: PropTypes.func.isRequired,
};

export default ButtonPrimary;
