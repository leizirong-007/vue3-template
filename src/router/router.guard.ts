import type { Router } from "vue-router";
import { useRouterStore } from "@/store/modules/router";
import { useUserStore } from "@/store/modules/user";
import { clearAll } from "@/utils/utils.cache-operator";
import { loadingBar, message } from "@/naive";

// 解决刷新动态路由丢失
const isRefresh = { value: true };
// 白名单
const whiteList: string[] = ["/login"];
// 路由加载条

export const mountGuard = (router: Router): void => {
  // 路由加载前
  router.beforeEach(async (to, _from, next) => {
    loadingBar.start();
    const { user_token, user_userInfo, useGetUserInfo, useUserStateOperator } = useUserStore();
    const { router_asyncRoutes } = useRouterStore();

    // 用户已登录
    if (user_token.access_token) {
      // 已登录 路由地址为login则跳转到首页
      if (!user_userInfo.id) {
        // 没有用户信息重新拉取
        try {
          await useGetUserInfo(user_token.userId);
        } catch (error: any) {
          message.error(error.message);
          // 清除缓存token
          clearAll("local");
          useUserStateOperator("user_token", {});
          next("/login");
        }
        // 设置动态路由
        router_asyncRoutes.forEach((route) => {
          router.addRoute("/", route);
        });
        if (to.path === "/login") {
          next("/");
        } else if (isRefresh.value) {
          isRefresh.value = false;
          next({ ...to, replace: true });
        } else {
          next();
        }
      } else if (to.path === "/login") {
        next("/");
      } else {
        next();
      }
    } else if (whiteList.indexOf(to.path) > -1) {
      // 用户未登录 可以进入白名单
      next();
    } else {
      // 用户未登录 路由地址不在白名单白名单 跳转到login
      next("/login");
    }
  });
  router.afterEach(() => {
    loadingBar.finish();
  });
};
