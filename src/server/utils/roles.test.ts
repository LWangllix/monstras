import { Permissions, PERMISSION_STATUSES } from "../../config";
import { Tenant } from "../models/Tenant";
import TenantUser from "../models/TenantUser";
import { User } from "../models/User";
import {
  RoleTenantOwner,
  RoleAdmin,
  RoleInspector,
  RoleApprover,
  RoleFisherFreelancerEnabled,
  RoleFisherFreelancerSuspended,
  RoleFisherFreelancer,
  RoleFisherInTenantEnabled,
  RoleFisherInTenantSuspended,
  RoleFisherInTenant,
  RoleFisher,
  RoleInvestigator,
} from "./roles";

const user = new User();
const tenant = new Tenant();
const tenantUser = new TenantUser();

beforeEach(() => {
  user.tenantUsers = [tenantUser];
  user.permission = {
    admin: PERMISSION_STATUSES.ENABLED,
    inspector: PERMISSION_STATUSES.APPROVER,
    user: PERMISSION_STATUSES.ENABLED,
    investigator: PERMISSION_STATUSES.ENABLED,
  };

  tenant.permission = {
    user: PERMISSION_STATUSES.ENABLED,
    investigator: PERMISSION_STATUSES.DISABLED,
  };

  tenantUser.permission = {
    user: PERMISSION_STATUSES.ENABLED,
    investigator: PERMISSION_STATUSES.DISABLED,
  };
  tenantUser.user = user;
  tenantUser.id = "1";
  tenantUser.tenant = tenant;
});

describe("Test Roles", () => {
  describe("RoleTenantOwner", () => {
    test("should have TenantOwner role if user belongs to tenant and TenantOwner permission is enabled.", () => {
      tenantUser.permission[Permissions.TenantOwner.id] =
        PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleTenantOwner, tenantToTest)).toBeTruthy();
    });

    test("should NOT have TenantOwner role if user belongs to tenant and TenantOwner permission is NOT enabled.", () => {
      tenantUser.permission[Permissions.TenantOwner.id] =
        PERMISSION_STATUSES.DISABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleTenantOwner, tenantToTest)).toBeFalsy();
    });

    test("should NOT have TenantOwner role if user DOES NOT belong to tenant", () => {
      tenantUser.permission[Permissions.TenantOwner.id] =
        PERMISSION_STATUSES.ENABLED;

      const tenantToTest = "tenant id user does NOT belong to";
      expect(user.hasPermission(RoleTenantOwner, tenantToTest)).toBeFalsy();
    });
  });

  describe("RoleAdmin", () => {
    test("should have Admin role if admin permission is Enabled", () => {
      user.permission[Permissions.Admin.id] = PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleAdmin, tenantToTest)).toBeTruthy();
    });

    test("should NOT have Admin role if admin permission is Disabled", () => {
      user.permission[Permissions.Admin.id] = PERMISSION_STATUSES.DISABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleAdmin, tenantToTest)).toBeFalsy();
    });
  });

  describe("RoleInvestigator", () => {
    test("should have Investigator role if investigator permission is Enabled", () => {
      user.permission[Permissions.Investigator.id] =
        PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleInvestigator, tenantToTest)).toBeTruthy();
    });

    test("should NOT have Investigator role if investigator permission is Disabled", () => {
      user.permission[Permissions.Investigator.id] =
        PERMISSION_STATUSES.DISABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleInvestigator, tenantToTest)).toBeFalsy();
    });
  });

  describe("RoleInspector", () => {
    test("should have Inspector role if Inspector permission is Enabled", () => {
      user.permission[Permissions.Inspector.id] = PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleInspector, tenantToTest)).toBeTruthy();
    });

    test("should have Inspector role if Inspector permission is Approver", () => {
      user.permission[Permissions.Inspector.id] = PERMISSION_STATUSES.APPROVER;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleInspector, tenantToTest)).toBeTruthy();
    });

    test("should NOT have Inspector role if Inspector permission is Disabled", () => {
      user.permission[Permissions.Inspector.id] = PERMISSION_STATUSES.DISABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleInspector, tenantToTest)).toBeFalsy();
    });
  });

  describe("RoleApprover", () => {
    test("should have Approver role if Inspector permission is Approver", () => {
      user.permission[Permissions.Inspector.id] = PERMISSION_STATUSES.APPROVER;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleApprover, tenantToTest)).toBeTruthy();
    });

    test("should NOT have Approver role if Inspector permission is Enabled", () => {
      user.permission[Permissions.Inspector.id] = PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleApprover, tenantToTest)).toBeFalsy();
    });

    test("should NOT have Approver role if Inspector permission is Disabled", () => {
      user.permission[Permissions.Inspector.id] = PERMISSION_STATUSES.DISABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleApprover, tenantToTest)).toBeFalsy();
    });
  });

  describe("RoleFisherFreelancerEnabled", () => {
    test("should have RoleFisherFreelancerEnabled role if User permission is Enabled", () => {
      user.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherFreelancerEnabled, tenantToTest)
      ).toBeTruthy();
    });

    test("should NOT have RoleFisherFreelancerEnabled role if User permission is Suspended", () => {
      user.permission[Permissions.User.id] = PERMISSION_STATUSES.SUSPENDED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherFreelancerEnabled, tenantToTest)
      ).toBeFalsy();
    });

    test("should NOT have RoleFisherFreelancerEnabled role if User permission is Disabled", () => {
      user.permission[Permissions.User.id] = PERMISSION_STATUSES.DISABLED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherFreelancerEnabled, tenantToTest)
      ).toBeFalsy();
    });
  });

  describe("RoleFisherFreelancerSuspended", () => {
    test("should have RoleFisherFreelancerSuspended role if User permission is Suspended", () => {
      user.permission[Permissions.User.id] = PERMISSION_STATUSES.SUSPENDED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherFreelancerSuspended, tenantToTest)
      ).toBeTruthy();
    });

    test("should NOT have RoleFisherFreelancerSuspended role if User permission is Enabled", () => {
      user.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherFreelancerSuspended, tenantToTest)
      ).toBeFalsy();
    });

    test("should NOT have RoleFisherFreelancerSuspended role if User permission is Disabled", () => {
      user.permission[Permissions.User.id] = PERMISSION_STATUSES.DISABLED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherFreelancerSuspended, tenantToTest)
      ).toBeFalsy();
    });
  });

  describe("RoleFisherFreelancer", () => {
    test("should have RoleFisherFreelancer role if User permission is Enabled", () => {
      user.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherFreelancer, tenantToTest)
      ).toBeTruthy();
    });

    test("should have RoleFisherFreelancer role if User permission is Suspended", () => {
      user.permission[Permissions.User.id] = PERMISSION_STATUSES.SUSPENDED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherFreelancer, tenantToTest)
      ).toBeTruthy();
    });

    test("should NOT have RoleFisherFreelancer role if User permission is Disabled", () => {
      user.permission[Permissions.User.id] = PERMISSION_STATUSES.DISABLED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherFreelancer, tenantToTest)
      ).toBeFalsy();
    });
  });

  describe("RoleFisherInTenantEnabled", () => {
    test("should have RoleFisherInTenantEnabled role if User permission is Enabled on both - tenantUser and tenant", () => {
      tenantUser.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;
      tenant.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherInTenantEnabled, tenantToTest)
      ).toBeTruthy();
    });

    test("should NOT have RoleFisherInTenantEnabled role if User permission is Enabled on tenant but NOT on tenantUser", () => {
      tenantUser.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;
      tenant.permission[Permissions.User.id] = PERMISSION_STATUSES.DISABLED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherInTenantEnabled, tenantToTest)
      ).toBeFalsy();
    });

    test("should NOT have RoleFisherInTenantEnabled role if User permission is NOT Enabled on tenant but enabled on tenantUser", () => {
      tenantUser.permission[Permissions.User.id] = PERMISSION_STATUSES.DISABLED;
      tenant.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherInTenantEnabled, tenantToTest)
      ).toBeFalsy();
    });
  });

  describe("RoleFisherInTenantSuspended", () => {
    test("should have RoleFisherInTenantSuspended role if User permission is Suspended on tenantUser but not tenant", () => {
      tenantUser.permission[Permissions.User.id] =
        PERMISSION_STATUSES.SUSPENDED;
      tenant.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherInTenantSuspended, tenantToTest)
      ).toBeTruthy();
    });

    test("should have RoleFisherInTenantSuspended role if User permission is Suspended on tenant but not tenantUser", () => {
      tenantUser.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;
      tenant.permission[Permissions.User.id] = PERMISSION_STATUSES.SUSPENDED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherInTenantSuspended, tenantToTest)
      ).toBeTruthy();
    });

    test("should have RoleFisherInTenantSuspended role if User permission is Suspended on both - tenant and tenantUser", () => {
      tenantUser.permission[Permissions.User.id] =
        PERMISSION_STATUSES.SUSPENDED;
      tenant.permission[Permissions.User.id] = PERMISSION_STATUSES.SUSPENDED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherInTenantSuspended, tenantToTest)
      ).toBeTruthy();
    });

    test("should NOT have RoleFisherInTenantSuspended role if User permission is Enabled on both - tenant and tenantUser", () => {
      tenantUser.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;
      tenant.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(
        user.hasPermission(RoleFisherInTenantSuspended, tenantToTest)
      ).toBeFalsy();
    });
  });

  describe("RoleFisherInTenant", () => {
    test("should have RoleFisherInTenant role if User permission is Suspended on tenantUser but not tenant", () => {
      tenantUser.permission[Permissions.User.id] =
        PERMISSION_STATUSES.SUSPENDED;
      tenant.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleFisherInTenant, tenantToTest)).toBeTruthy();
    });
  });

  describe("RoleFisher", () => {
    test("should have RoleFisher role if freelancer", () => {
      user.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;
      tenantUser.permission[Permissions.User.id] = PERMISSION_STATUSES.DISABLED;
      tenant.permission[Permissions.User.id] = PERMISSION_STATUSES.DISABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleFisher, tenantToTest)).toBeTruthy();
    });

    test("should have RoleFisher role if fisher in tenant", () => {
      user.permission[Permissions.User.id] = PERMISSION_STATUSES.DISABLED;
      tenantUser.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;
      tenant.permission[Permissions.User.id] = PERMISSION_STATUSES.ENABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleFisher, tenantToTest)).toBeTruthy();
    });

    test("should NOT have RoleFisher role if not a fisher in tenant and not a freelancer", () => {
      user.permission[Permissions.User.id] = PERMISSION_STATUSES.DISABLED;
      tenantUser.permission[Permissions.User.id] = PERMISSION_STATUSES.DISABLED;
      tenant.permission[Permissions.User.id] = PERMISSION_STATUSES.DISABLED;

      const tenantToTest = tenantUser.id;
      expect(user.hasPermission(RoleFisher, tenantToTest)).toBeFalsy();
    });
  });
});
