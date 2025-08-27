import { HStack, Center, CenterProps } from "@hope-ui/solid"
import { changeColor } from "seemly"
import {
  Show,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
} from "solid-js"
import { getMainColor, getSetting, local, objStore, State } from "~/store"
import { Container } from "../Container"
import { Layout } from "./layout"

export const Header = () => {
  const [currentTime, setCurrentTime] = createSignal(new Date())

  const stickyProps = createMemo<CenterProps>(() => {
    switch (local["position_of_header_navbar"]) {
      case "sticky":
        return { position: "sticky", zIndex: "$sticky", top: 0 }
      default:
        return { position: undefined, zIndex: undefined, top: undefined }
    }
  })

  createEffect(() => {
    // 每分钟更新一次时间
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    })

    // 组件卸载时清除定时器
    onCleanup(() => clearInterval(timer))

    // 设置初始时间
    setCurrentTime(new Date())
  })

  return (
    <Center
      {...stickyProps}
      bgColor="$background"
      class="header"
      w="$full"
      // shadow="$md"
    >
      <Container>
        <HStack
          px="calc(2% + 0.5rem)"
          py="$2"
          w="$full"
          justifyContent="space-between"
        >
          <HStack class="header-left">
            <HStack
              px="$2"
              py="$1"
              rounded="$md"
              bgColor={changeColor(getMainColor(), { alpha: 0.15 })}
              color={getMainColor()}
            >
              v0.0.0&nbsp;&nbsp;&nbsp;
              {currentTime().toLocaleString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </HStack>
          </HStack>
          <HStack class="header-right" spacing="$2">
            <Show when={objStore.state === State.Folder}>
              <Layout />
            </Show>
          </HStack>
        </HStack>
      </Container>
    </Center>
  )
}
