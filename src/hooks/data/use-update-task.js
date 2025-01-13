import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";

export const useUpdateTask = (taskId) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateTask", taskId],
        mutationFn: async (updateData) => {
            const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
                title: updateData.title.trim(),
                description: updateData.description.trim(),
                time: updateData.time.trim(),
            }
            )

            // atualiza o Cache
            queryClient.setQueryData("tasks", (oldTasks) => {
                return oldTasks.map((oldTask) => {
                    if (oldTask.id === taskId) {
                        return updatedTask;
                    }
                    return oldTask;
                });
            });
            queryClient.setQueryData(["task", taskId], updatedTask)
        },
    });
}