<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string)$this->id,
            'attributes' => [
                'uuid' => $this->uuid,
                'name' => $this->name,
                'username' => $this->username,
                'email' => $this->email,
                'status' => $this->isActive?->getStatus(),
                'statusColor' => $this->isActive?->getStatusColor(),
                'created_at' => $this->created_at->format('d-m-Y h:s a'),
            ],
        ];
    }
}
