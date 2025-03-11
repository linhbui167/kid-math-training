"use client";

import { useAppContext } from "@/context/AppContext";
import { useConfig } from "@/context/ConfigContext";
import { Input, Popover, Transition } from "@headlessui/react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useRef } from "react";
import CheckboxGroup from "../CheckboxGroup";
import { TRAIN_TYPES } from "@/utils/const";

export default function ConfigPopover() {
  const { handleClearState } = useAppContext();
  const ref = useRef(null);
  const { config, updateConfig, clearConfig } = useConfig();

  return (
    <Popover className="relative" ref={ref}>
      <Popover.Button className="p-2 rounded-full hover:bg-gray-700">
        <Cog6ToothIcon className="w-8 h-6 text-white" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <Popover.Panel
          style={{ color: "rgb(64 64 64)" }}
          className="absolute right-0 z-10 mt-2 w-100 bg-white shadow-xl rounded-xl border border-gray-200 p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-700">App Config</span>
            <Popover.Button className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="w-5 h-5" />
            </Popover.Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enable_celebrity"
                checked={config.enable_celebrity}
                onChange={(e) =>
                  updateConfig({ enable_celebrity: e.target.checked })
                }
                className="accent-indigo-500 w-7 h-4"
              />
              <label htmlFor="enable_celebrity" className="text-sm">
                Show pháo hoa
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.persist_progress}
                id="persist_progress"
                onChange={(e) =>
                  updateConfig({ persist_progress: e.target.checked })
                }
                className="accent-indigo-500 w-7 h-4"
              />
              <label htmlFor="persist_progress" className="text-sm">
                Lưu tiến trình
              </label>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="up_level_period" className="text-sm">
                <span>Chuyển màu sau </span>
                <input
                  type="number"
                  value={config.up_level_period}
                  id="up_level_period"
                  onChange={(e) =>
                    updateConfig({ up_level_period: Number(e.target.value) })
                  }
                  className="accent-indigo-500 w-7 h-7 text-center bordered"
                />{" "}
                <span> lần đúng</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="up_level_period" className="text-sm">
                <span>Hoàn thành sau </span>{" "}
                <input
                  type="number"
                  value={config.count_finished}
                  id="up_level_period"
                  onChange={(e) =>
                    updateConfig({ count_finished: Number(e.target.value) })
                  }
                  className="accent-indigo-500 w-7 h-7 text-center"
                />{" "}
                <span> lần đúng</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.is_junior}
                id="is_junior"
                onChange={(e) => updateConfig({ is_junior: e.target.checked })}
                className="accent-indigo-500 w-7 h-4"
              />
              <label htmlFor="is_junior" className="text-sm">
                Trình độ mẫu giáo ( cộng trừ số nhỏ )
              </label>
            </div>

            {/* Train Type */}
            {!config.is_junior && (
              <div>
                <label className="block text-sm mb-1 font-bold">
                  Dạng bài tập
                </label>
                <div className="flex items-center gap-2">
                  <CheckboxGroup
                    selectedValues={config.train_type}
                    options={[
                      {
                        label: "Nhân",
                        value: TRAIN_TYPES.MULTIPLY,
                      },
                      {
                        label: "Chia",
                        value: TRAIN_TYPES.DIVIDE,
                      },
                      {
                        label: "Số trăm",
                        value: TRAIN_TYPES.HUNDRED_OPERATION,
                      },
                    ]}
                    onChange={(value) =>
                      updateConfig({ train_type: value as TRAIN_TYPES[] })
                    }
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleClearState}
              className="w-full  text-white rounded py-1.5 text-sm bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
            >
              Xoá chuỗi
            </button>

            <button
              onClick={clearConfig}
              className="w-full bg-neutral-500 hover:bg-neutral-600 text-white rounded py-1.5 text-sm"
            >
              Đặt lại
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
