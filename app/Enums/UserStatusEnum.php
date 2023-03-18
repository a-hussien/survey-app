<?php

namespace App\Enums;

enum UserStatusEnum: int
{
    case Active = 1;
    case InActive = 0;


    public function userIsActive(): bool
    {
        return $this === self::Active;
    }

    public function userIsNotActive(): bool
    {
        return $this === self::InActive;
    }

    public function getStatus(): string
    {
        return match($this) {
            self::Active => 'Active',
            self::InActive => 'InActive',
        };
    }

    public function getStatusColor(): string
    {
        return match($this) {
            self::Active => "active-user",
            self::InActive => "in-active-user",
        };
    }

    // public function getStatusHtml(): string
    // {
    //     return sprintf('<span className="font-medium py-1 px-3 rounded-full text-xs %s">%s</span>',
    //     $this->getStatusColor(), $this->getStatus());
    // }

}
