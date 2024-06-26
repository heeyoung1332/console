import type { RouteConfig } from 'vue-router';

import { SpaceConnector } from '@cloudforet/core-lib/space-connector';

import type { ListResponse } from '@/schema/_common/api-verbs/list';
import type { CostDataSourceListParameters } from '@/schema/cost-analysis/data-source/api-verbs/list';
import type { DataSourceModel } from '@/schema/monitoring/data-source/model';

import { makeAdminRouteName } from '@/router/helpers/route-helper';

import { MENU_ID } from '@/lib/menu/config';
import { MENU_INFO_MAP } from '@/lib/menu/menu-info';

import ErrorHandler from '@/common/composables/error/errorHandler';

import { DYNAMIC_COST_QUERY_SET_PARAMS, MANAGED_COST_QUERY_SET_IDS } from '@/services/cost-explorer/constants/managed-cost-analysis-query-sets';
import CostExplorerHome from '@/services/cost-explorer/pages/CostExplorerHome.vue';
import { COST_EXPLORER_ROUTE } from '@/services/cost-explorer/routes/route-constant';

const CostExplorerContainer = () => import('@/services/cost-explorer/CostExplorerContainer.vue');

const AdminBudgetMainPage = () => import('@/services/cost-explorer/pages/admin/AdminBudgetMainPage.vue');
const AdminBudgetCreatePage = () => import('@/services/cost-explorer/pages/admin/AdminBudgetCreatePage.vue');
const AdminBudgetDetailPage = () => import('@/services/cost-explorer/pages/admin/AdminBudgetDetailPage.vue');

const AdminCostAnalysisPage = () => import('@/services/cost-explorer/pages/admin/AdminCostAnalysisPage.vue');
const CostReportPage = () => import('@/services/cost-explorer/pages/CostReportPage.vue');
const DataSourcesPage = () => import('@/services/cost-explorer/pages/admin/AdminDataSourcePage.vue');

const adminCostExplorerRoutes: RouteConfig = {
    path: 'cost-explorer',
    name: makeAdminRouteName(COST_EXPLORER_ROUTE._NAME),
    meta: {
        menuId: MENU_ID.COST_EXPLORER,
        translationId: MENU_INFO_MAP[MENU_ID.COST_EXPLORER].translationId,
    },
    redirect: () => ({ name: makeAdminRouteName(COST_EXPLORER_ROUTE.COST_ANALYSIS._NAME) }),
    component: CostExplorerContainer,
    children: [
        {
            path: 'landing',
            meta: { centeredLayout: true },
            name: makeAdminRouteName(COST_EXPLORER_ROUTE.LANDING._NAME),
            component: CostExplorerHome as any,
        },
        {
            path: 'cost-analysis',
            meta: {
                menuId: MENU_ID.COST_ANALYSIS,
                translationId: MENU_INFO_MAP[MENU_ID.COST_ANALYSIS].translationId,
            },
            component: { template: '<router-view />' },
            children: [
                {
                    path: '/',
                    name: makeAdminRouteName(COST_EXPLORER_ROUTE.COST_ANALYSIS._NAME),
                    meta: { lsbVisible: true },
                    beforeEnter: async (to, from, next) => {
                        try {
                            const response = await SpaceConnector.clientV2.costAnalysis.dataSource.list<CostDataSourceListParameters, ListResponse<DataSourceModel>>();
                            const results = response?.results || [];
                            if (results.length === 0) { // none-data-source case
                                next({ name: makeAdminRouteName(COST_EXPLORER_ROUTE.LANDING._NAME) });
                            } else if (to.params.dataSourceId && to.params.costQuerySetId) {
                                next();
                            } else {
                                next({
                                    name: makeAdminRouteName(COST_EXPLORER_ROUTE.COST_ANALYSIS.QUERY_SET._NAME),
                                    params: {
                                        dataSourceId: results[0].data_source_id,
                                        costQuerySetId: MANAGED_COST_QUERY_SET_IDS.MONTHLY_WORKSPACE,
                                    },
                                });
                            }
                        } catch (e) {
                            ErrorHandler.handleError(e);
                        }
                    },
                },
                {
                    path: ':dataSourceId/:costQuerySetId',
                    name: makeAdminRouteName(COST_EXPLORER_ROUTE.COST_ANALYSIS.QUERY_SET._NAME),
                    meta: {
                        lsbVisible: true,
                        label: ({ params }) => (params.costQuerySetId === DYNAMIC_COST_QUERY_SET_PARAMS ? undefined : params.costQuerySetId),
                        copiable: ({ params }) => ![DYNAMIC_COST_QUERY_SET_PARAMS].includes(params.costQuerySetId),
                    },
                    props: true,
                    component: AdminCostAnalysisPage as any,
                },
            ],
        },
        {
            path: 'budget',
            meta: {
                menuId: makeAdminRouteName(MENU_ID.BUDGET),
                translationId: MENU_INFO_MAP[MENU_ID.BUDGET].translationId,
            },
            component: { template: '<router-view />' },
            beforeEnter: async (to, from, next) => {
                try {
                    const response = await SpaceConnector.clientV2.costAnalysis.dataSource.list<CostDataSourceListParameters, ListResponse<DataSourceModel>>({
                        query: {
                            sort: [{ key: 'workspace_id', desc: true }],
                        },
                    });
                    const results = response?.results || [];
                    if (results.length === 0) { // none-data-source case
                        next({ name: makeAdminRouteName(COST_EXPLORER_ROUTE.LANDING._NAME) });
                    } else {
                        next();
                    }
                } catch (e) {
                    ErrorHandler.handleError(e);
                }
            },
            children: [
                {
                    path: '/',
                    name: makeAdminRouteName(COST_EXPLORER_ROUTE.BUDGET._NAME),
                    meta: { menuId: MENU_ID.BUDGET },
                    component: AdminBudgetMainPage as any,
                },
                {
                    path: 'create',
                    name: makeAdminRouteName(COST_EXPLORER_ROUTE.BUDGET.CREATE._NAME),
                    meta: { translationId: 'BILLING.COST_MANAGEMENT.BUDGET.MAIN.CREATE_BUDGET' },
                    component: AdminBudgetCreatePage as any,
                },
                {
                    path: ':budgetId',
                    name: makeAdminRouteName(COST_EXPLORER_ROUTE.BUDGET.DETAIL._NAME),
                    props: true,
                    meta: { label: ({ params }) => params.budgetId, copiable: true },
                    component: AdminBudgetDetailPage as any,
                },
            ],
        },
        {
            path: 'cost-report',
            meta: {
                menuId: MENU_ID.COST_REPORT,
                translationId: MENU_INFO_MAP[MENU_ID.COST_REPORT].translationId,
            },
            component: { template: '<router-view />' },
            beforeEnter: async (to, from, next) => {
                try {
                    const response = await SpaceConnector.clientV2.costAnalysis.dataSource.list<CostDataSourceListParameters, ListResponse<DataSourceModel>>();
                    const results = response?.results || [];
                    if (results.length === 0) { // none-data-source case
                        next({ name: makeAdminRouteName(COST_EXPLORER_ROUTE.LANDING._NAME) });
                    } else {
                        next();
                    }
                } catch (e) {
                    ErrorHandler.handleError(e);
                }
            },
            children: [
                {
                    path: '/',
                    name: makeAdminRouteName(COST_EXPLORER_ROUTE.COST_REPORT._NAME),
                    meta: { menuId: MENU_ID.COST_REPORT },
                    component: CostReportPage as any,
                },
            ],
        },
        {
            path: 'data-sources',
            meta: {
                menuId: MENU_ID.DATA_SOURCES,
                translationId: MENU_INFO_MAP[MENU_ID.DATA_SOURCES].translationId,
            },
            component: { template: '<router-view />' },
            beforeEnter: async (to, from, next) => {
                try {
                    const response = await SpaceConnector.clientV2.costAnalysis.dataSource.list<CostDataSourceListParameters, ListResponse<DataSourceModel>>();
                    const results = response?.results || [];
                    if (results.length === 0) { // none-data-source case
                        next({ name: makeAdminRouteName(COST_EXPLORER_ROUTE.LANDING._NAME) });
                    } else {
                        next();
                    }
                } catch (e) {
                    ErrorHandler.handleError(e);
                }
            },
            children: [
                {
                    path: '/',
                    name: makeAdminRouteName(COST_EXPLORER_ROUTE.DATA_SOURCES._NAME),
                    component: DataSourcesPage as any,
                },
            ],
        },
    ],
};

export default adminCostExplorerRoutes;
