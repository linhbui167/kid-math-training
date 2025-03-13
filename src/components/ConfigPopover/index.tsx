"use client";

import { useAppContext } from "@/context/AppContext";
import { AppConfig, defaultConfig, useConfig } from "@/context/ConfigContext";
import { Popover, Transition } from "@headlessui/react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import CheckboxGroup from "../CheckboxGroup";
import { TRAIN_TYPES } from "@/utils/const";

const ConfigBody = () => {
  const { handleClearState } = useAppContext();

  const { config, updateConfig } = useConfig();
  const [tmpConfig, setTmpConfig] = useState(config);

  const updateTmpConfig = (newConfig: Partial<AppConfig>) => {
    setTmpConfig((prev) => ({
      ...prev,
      ...newConfig,
    }));
  };
  return (
    <>
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
            checked={tmpConfig.enable_celebrity}
            onChange={(e) =>
              updateTmpConfig({ enable_celebrity: e.target.checked })
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
            checked={tmpConfig.persist_progress}
            id="persist_progress"
            onChange={(e) =>
              updateTmpConfig({ persist_progress: e.target.checked })
            }
            className="accent-indigo-500 w-7 h-4"
          />
          <label htmlFor="persist_progress" className="text-sm">
            Lưu tiến trình
          </label>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="up_level_period" className="text-sm">
            <span>Hoàn thành sau </span>{" "}
            <input
              type="number"
              value={tmpConfig.count_finished}
              id="up_level_period"
              onChange={(e) =>
                updateTmpConfig({ count_finished: Number(e.target.value) })
              }
              className="accent-indigo-500 w-7 h-7 text-center"
            />{" "}
            <span> lần đúng</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={tmpConfig.is_junior}
            id="is_junior"
            onChange={(e) => updateTmpConfig({ is_junior: e.target.checked })}
            className="accent-indigo-500 w-7 h-4"
          />
          <label htmlFor="is_junior" className="text-sm">
            Trình độ mẫu giáo ( cộng trừ số nhỏ )
          </label>
        </div>

        {/* Train Type */}
        {!tmpConfig.is_junior && (
          <div key={Math.random()}>
            <label className="block text-sm mb-1 font-bold">Dạng bài tập</label>
            <div className="flex text-sm items-center gap-2 mt-2 ">
              <CheckboxGroup
                selectedValues={tmpConfig.train_type}
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
                  updateTmpConfig({
                    train_type: value?.length
                      ? (value as TRAIN_TYPES[])
                      : [TRAIN_TYPES.MULTIPLY],
                  })
                }
              />
            </div>
            {(tmpConfig.train_type.includes(TRAIN_TYPES.DIVIDE) ||
              tmpConfig.train_type.includes(TRAIN_TYPES.MULTIPLY)) && (
              <div className="mt-2">
                <label className="block text-sm mb-1 font-bold">Đối số</label>
                <div className="flex text-sm gap-2 space-x-2 mt-2">
                  <CheckboxGroup
                    selectedValues={tmpConfig.multiplication_numbers || []}
                    options={new Array(8).fill(0).map((_, i) => ({
                      label: `${i + 2}`,
                      value: `${i + 2}`,
                    }))}
                    onChange={(value) => {
                      updateTmpConfig({
                        multiplication_numbers: value?.length ? value : ["2"],
                      });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => {
            updateConfig(tmpConfig);
          }}
          className="w-full  text-white rounded py-1.5 text-sm bg-sky-600 py-2 px-4 text-sm text-white hover:bg-sky-500 "
        >
          Câp nhật
        </button>

        <button
          onClick={() => {
            setTmpConfig(defaultConfig);
          }}
          className="w-full bg-neutral-500 hover:bg-neutral-600 text-white rounded py-1.5 text-sm"
        >
          Đặt lại cài đặt
        </button>
        <button
          onClick={handleClearState}
          className="w-full  text-white rounded py-1.5 text-sm bg-red-500 py-2 px-4 text-sm text-white hover:bg-red-600 "
        >
          Xoá tiến trình
        </button>
      </div>
    </>
  );
};

export default function ConfigPopover() {
  return (
    <Popover className="relative">
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
          className="absolute right-0 z-10 mt-2 w-120 bg-white shadow-xl rounded-xl border border-gray-200 p-4"
        >
          <ConfigBody />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
