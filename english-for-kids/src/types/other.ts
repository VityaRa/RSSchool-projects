import React from "react";

export type ComponentType<T = any> = typeof React.Component | React.FC<T>;
