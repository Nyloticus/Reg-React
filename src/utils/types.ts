export type Alert = {
  open: Boolean;
  type: "error" | "success";
  message: string;
};

export type UserRoles = "admin" | "casher" | "chief";

export type UserRolesList = { label: string; value: UserRoles };

export type StateTypes = "default" | "create" | "update";

export type PromoCodeTypes = "percentage" | "amount";

export type PromocodesList = { label: string; value: PromoCodeTypes };
