"use client";

import { useAppContext } from "@/context/AppContext";
import { TrainType, useConfig } from "@/context/ConfigContext";
import { Popover, Transition } from "@headlessui/react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

export default function ConfigPopover() {
  const { handleClearState } = useAppContext();
  const { config, updateConfig, clearConfig } = useConfig();

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
          className="absolute right-0 z-10 mt-2 w-100 bg-white shadow-xl rounded-xl border border-gray-200 p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-700">App Config</span>
            <Popover.Button className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="w-5 h-5" />
            </Popover.Button>
          </div>

          <div className="space-y-4">
            {/* Enable Celebrity */}
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
                Enable Celebrity
              </label>
            </div>

            {/* Persist Progress */}
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
                Persist Progress
              </label>
            </div>

            {/* Persist Progress */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={config.up_level_period}
                id="up_level_period"
                onChange={(e) =>
                  updateConfig({ up_level_period: Number(e.target.value) })
                }
                className="accent-indigo-500 w-7 h-7 text-center"
              />
              <label htmlFor="up_level_period" className="text-sm">
                Uplevel on Streak
              </label>
            </div>

            {/* Train Type */}
            <div>
              <label className="block text-sm mb-1">Train Type</label>
              <select
                value={config.train_type}
                onChange={(e) =>
                  updateConfig({ train_type: e.target.value as TrainType })
                }
                className="w-full border rounded px-2 py-1 outline-none"
              >
                <option value="basic">Basic</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <button
              onClick={handleClearState}
              className="w-full  text-white rounded py-1.5 text-sm bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
            >
              Clear Progress
            </button>

            <button
              onClick={clearConfig}
              className="w-full bg-neutral-500 hover:bg-neutral-600 text-white rounded py-1.5 text-sm"
            >
              Clear Config
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
