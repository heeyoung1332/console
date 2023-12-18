// TODO: change file name to page-access-helper.ts


import type { RoleType } from '@/schema/identity/role/type';

import type {
    PagePermissionMap,
} from '@/lib/access-control/config';
import {
    DOMAIN_ADMIN_DEFAULT_PERMISSIONS,
    NO_ROLE_USER_DEFAULT_PERMISSIONS,
    SYSTEM_USER_DEFAULT_PERMISSIONS, WORKSPACE_MEMBER_DEFAULT_PERMISSIONS, WORKSPACE_OWNER_DEFAULT_PERMISSIONS,
} from '@/lib/access-control/config';
import type { Menu, MenuId } from '@/lib/menu/config';

import type { LNBItem, LNBMenu } from '@/common/modules/navigations/lnb/type';




export const getDefaultPagePermissionList = (roleType?: RoleType): MenuId[] => {
    if (roleType === 'SYSTEM_ADMIN') return SYSTEM_USER_DEFAULT_PERMISSIONS;
    if (roleType === 'DOMAIN_ADMIN') return DOMAIN_ADMIN_DEFAULT_PERMISSIONS;
    if (roleType === 'WORKSPACE_OWNER') return WORKSPACE_OWNER_DEFAULT_PERMISSIONS;
    if (roleType === 'WORKSPACE_MEMBER') return WORKSPACE_MEMBER_DEFAULT_PERMISSIONS;
    return NO_ROLE_USER_DEFAULT_PERMISSIONS;
};

export const flattenMenu = (menuList: Menu[]): Menu[] => menuList.flatMap((menu) => [
    { id: menu.id, needPermissionByRole: menu.needPermissionByRole },
    ...(menu.subMenuList ? flattenMenu(menu.subMenuList) : []),
]);

const filterMenuByPermission = (menuList: Menu[]): Menu[] => menuList.filter((menu) => menu.needPermissionByRole)
    .map((menu) => ({
        ...menu,
        subMenuList: menu.subMenuList ? filterMenuByPermission(menu.subMenuList) : [],
    }));


export const getPagePermissionMapFromRaw = (pagePermissions: string[], menuList: Menu[]): PagePermissionMap => {
    const result = {} as PagePermissionMap;
    const filterdMenuListByRequiredPermission = filterMenuByPermission(menuList);
    const flattendPermissionRequiredMenuList = flattenMenu(filterdMenuListByRequiredPermission);

    pagePermissions.forEach((page) => {
        // in case of wildcard
        if (page === '*') {
            flattendPermissionRequiredMenuList.forEach(({ id }) => {
                result[id] = true;
            });
            // in case of service wildcard
        } else if (page.endsWith('*')) {
            const menuId = page.replace('.*', '');
            const foundServiceMenuById = filterdMenuListByRequiredPermission.find(({ id }) => id === menuId);
            if (!foundServiceMenuById) return;
            flattenMenu([foundServiceMenuById]).forEach(({ id }) => {
                result[id] = true;
            });

            // general case
        } else {
            const pageHierarchyList = page.split('.');
            const menuIdByPageName = page.split('.')[pageHierarchyList.length];
            result[menuIdByPageName] = true;
        }
    });
    return result;
};

const hasAccessPermissionToLNBItem = (lnbItem: LNBItem, pageAccessList: MenuId[]): boolean => {
    const { id } = lnbItem;
    return pageAccessList.some((menuId) => menuId === id);
};
export const filterLNBMenuByPermission = (menuSet: LNBMenu[], pagePermissionList: MenuId[]): LNBMenu[] => menuSet.reduce((results, menuData) => {
    if (Array.isArray(menuData)) {
        const filteredMenuData = menuData.filter((lnbItem) => hasAccessPermissionToLNBItem(lnbItem, pagePermissionList));
        if (filteredMenuData.length) {
            results.push(filteredMenuData);
        }
    } else if (hasAccessPermissionToLNBItem(menuData, pagePermissionList)) {
        results.push(menuData);
    }

    return results;
}, [] as LNBMenu[]);

export const getPermissionOfMenu = (menuId: MenuId, pagePermissions: MenuId[]): boolean => pagePermissions.some((id) => id === menuId);
