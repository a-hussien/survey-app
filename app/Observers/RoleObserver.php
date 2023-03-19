<?php

namespace App\Observers;

use App\Models\Role;
use Ramsey\Uuid\Uuid;

class RoleObserver
{
    /**
     * Handle the Role "creating" event.
     */
    public function creating(Role $role): void
    {
        $role->uuid = Uuid::uuid4();
    }
}
